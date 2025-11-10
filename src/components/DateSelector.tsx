import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface DateSelectorProps {
  onDateSelect: (date: Date) => void;
  onReset: () => void;
  currentDate: Date;
  isTestMode: boolean;
}

export function DateSelector({ onDateSelect, onReset, currentDate, isTestMode }: DateSelectorProps) {
  // 공휴일
  const holidays = [
    { name: "신정", month: 1, day: 1, year: 2025 },
    { name: "설날", month: 1, day: 29, year: 2025 },
    { name: "삼일절", month: 3, day: 1 },
    { name: "어린이날", month: 5, day: 5 },
    { name: "현충일", month: 6, day: 6 },
    { name: "광복절", month: 8, day: 15 },
    { name: "추석", month: 10, day: 6, year: 2025 },
    { name: "개천절", month: 10, day: 3 },
    { name: "한글날", month: 10, day: 9 },
    { name: "크리스마스", month: 12, day: 25 },
  ];

  // 절기
  const seasons = [
    { name: "입춘", month: 2, day: 3 },
    { name: "경칩", month: 3, day: 5 },
    { name: "춘분", month: 3, day: 20 },
    { name: "청명", month: 4, day: 4 },
    { name: "입하", month: 5, day: 5 },
    { name: "하지", month: 6, day: 21 },
    { name: "입추", month: 8, day: 7 },
    { name: "추분", month: 9, day: 23 },
    { name: "상강", month: 10, day: 23 },
    { name: "동지", month: 12, day: 21 },
  ];

  // 기념일
  const memorials = [
    { name: "밸런타인데이", month: 2, day: 14 },
    { name: "삼겹살데이", month: 3, day: 3 },
    { name: "화이트데이", month: 3, day: 14 },
    { name: "식목일", month: 4, day: 5 },
    { name: "어버이날", month: 5, day: 8 },
    { name: "스승의 날", month: 5, day: 15 },
    { name: "부부의 날", month: 5, day: 21 },
    { name: "제헌절", month: 7, day: 17 },
    { name: "국군의 날", month: 10, day: 1 },
  ];

  const handleQuickDate = (month: number, day: number, year?: number) => {
    const selectedDate = new Date(year || currentDate.getFullYear(), month - 1, day);
    onDateSelect(selectedDate);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <AnimatePresence mode="wait">
        {!isTestMode ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => onDateSelect(currentDate)}
              className="rounded-full shadow-xl bg-gray-900 hover:bg-gray-800 hover:scale-105 transition-transform"
              size="lg"
            >
              테스트 모드
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-80 max-h-[80vh] overflow-y-auto border border-gray-200/50"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-gray-900 !font-semibold">날짜 선택</h3>
              <Button
                onClick={onReset}
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100"
              >
                오늘로
              </Button>
            </div>

            {/* 공휴일 */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-gray-900 !text-sm !font-medium">공휴일</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {holidays.map((date) => (
                  <Button
                    key={`holiday-${date.month}-${date.day}`}
                    onClick={() => handleQuickDate(date.month, date.day, date.year)}
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    {date.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 절기 */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-gray-900 !text-sm !font-medium">절기</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {seasons.map((date) => (
                  <Button
                    key={`season-${date.month}-${date.day}`}
                    onClick={() => handleQuickDate(date.month, date.day, date.year)}
                    variant="outline"
                    size="sm"
                    className="w-full border-green-200 hover:bg-green-50 hover:border-green-300 transition-all"
                  >
                    {date.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 기념일 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <p className="text-gray-900 !text-sm !font-medium">기념일</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {memorials.map((date) => (
                  <Button
                    key={`memorial-${date.month}-${date.day}`}
                    onClick={() => handleQuickDate(date.month, date.day, date.year)}
                    variant="outline"
                    size="sm"
                    className="w-full border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all"
                  >
                    {date.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3">
                <p className="text-gray-700 text-center !text-sm">
                  {currentDate.toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}