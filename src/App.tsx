import { useMemo, useState } from "react";
import { holidays, Holiday } from "./data/holidays";
import { HolidayCard } from "./components/HolidayCard";
import { RegularDay } from "./components/RegularDay";
import { DateSelector } from "./components/DateSelector";
import { Button } from "./components/ui/button";
import { motion } from "motion/react";

export default function App() {
  const [testDate, setTestDate] = useState<Date | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'holiday' | 'memorial' | 'season'>('all');

  const { todayHoliday, nextHoliday, daysUntil } = useMemo(() => {
    const today = testDate || new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();

    // 필터링된 항목
    const applicableItems = holidays.filter((h) => {
      const yearMatch = !h.specificYear || h.specificYear === currentYear;
      const typeMatch = filterType === 'all' || h.type === filterType || (!h.type && filterType === 'holiday');
      return yearMatch && typeMatch;
    });

    // 오늘이 해당하는지 확인
    const todayHoliday = applicableItems.find(
      (h) => h.month === currentMonth && h.day === currentDay
    );

    // 다음 항목 찾기 (필터에 맞춰서)
    let targetItems: Holiday[] = [];
    
    if (filterType === 'all') {
      // 전체일 때는 공휴일만
      targetItems = holidays.filter(
        (h) => {
          const yearMatch = !h.specificYear || h.specificYear === currentYear;
          const typeMatch = h.type === 'holiday' || !h.type;
          return yearMatch && typeMatch;
        }
      );
    } else {
      // 특정 필터일 때는 해당 타입만
      targetItems = holidays.filter(
        (h) => {
          const yearMatch = !h.specificYear || h.specificYear === currentYear;
          const typeMatch = h.type === filterType || (!h.type && filterType === 'holiday');
          return yearMatch && typeMatch;
        }
      );
    }

    let nextHoliday: Holiday | null = null;
    let minDays = Infinity;

    targetItems.forEach((holiday) => {
      const holidayDate = new Date(currentYear, holiday.month - 1, holiday.day);
      
      if (holidayDate < today && !holiday.isLunar) {
        holidayDate.setFullYear(currentYear + 1);
      } else if (holidayDate < today && holiday.isLunar) {
        return;
      }

      const diffTime = holidayDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays < minDays) {
        minDays = diffDays;
        nextHoliday = holiday;
      }
    });

    if (!nextHoliday) {
      const nextYearItems = holidays.filter(
        (h) => {
          const yearMatch = !h.specificYear || h.specificYear === currentYear + 1;
          if (filterType === 'all') {
            return yearMatch && (h.type === 'holiday' || !h.type);
          } else {
            return yearMatch && (h.type === filterType || (!h.type && filterType === 'holiday'));
          }
        }
      );
      
      nextYearItems.forEach((holiday) => {
        const holidayDate = new Date(currentYear + 1, holiday.month - 1, holiday.day);
        const diffTime = holidayDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < minDays) {
          minDays = diffDays;
          nextHoliday = holiday;
        }
      });
    }

    return {
      todayHoliday,
      nextHoliday,
      daysUntil: minDays === Infinity ? 0 : minDays
    };
  }, [testDate, filterType]);

  const handleDateSelect = (date: Date) => {
    setTestDate(date);
    setIsTestMode(true);
  };

  const handleReset = () => {
    setTestDate(null);
    setIsTestMode(false);
  };

  return (
    <>
      {/* 필터 버튼 */}
      <motion.div
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-white/80 backdrop-blur-lg rounded-full p-1.5 shadow-lg border border-gray-200/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          onClick={() => setFilterType('all')}
          variant={filterType === 'all' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-full transition-all ${
            filterType === 'all' 
              ? 'bg-gray-900 text-white hover:bg-gray-800' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          전체
        </Button>
        <Button
          onClick={() => setFilterType('holiday')}
          variant={filterType === 'holiday' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-full transition-all ${
            filterType === 'holiday' 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          공휴일
        </Button>
        <Button
          onClick={() => setFilterType('memorial')}
          variant={filterType === 'memorial' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-full transition-all ${
            filterType === 'memorial' 
              ? 'bg-purple-500 text-white hover:bg-purple-600' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          기념일
        </Button>
        <Button
          onClick={() => setFilterType('season')}
          variant={filterType === 'season' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-full transition-all ${
            filterType === 'season' 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          절기
        </Button>
      </motion.div>

      <motion.div
        key={todayHoliday?.name || 'regular'}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        {todayHoliday ? (
          <HolidayCard holiday={todayHoliday} />
        ) : (
          <RegularDay nextHoliday={nextHoliday} daysUntil={daysUntil} filterType={filterType} />
        )}
      </motion.div>
      
      <DateSelector
        onDateSelect={handleDateSelect}
        onReset={handleReset}
        currentDate={testDate || new Date()}
        isTestMode={isTestMode}
      />
    </>
  );
}