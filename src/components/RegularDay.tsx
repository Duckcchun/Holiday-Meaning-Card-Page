import { Holiday } from "../data/holidays";
import { motion } from "motion/react";
import { Calendar, Clock, Filter } from "lucide-react";

interface RegularDayProps {
  nextHoliday: Holiday | null;
  daysUntil: number;
  filterType: 'all' | 'holiday' | 'memorial' | 'season';
}

export function RegularDay({ nextHoliday, daysUntil, filterType }: RegularDayProps) {
  const getFilterMessage = () => {
    switch (filterType) {
      case 'holiday': return { title: '오늘은 공휴일이 아닙니다', next: '다음 공휴일까지' };
      case 'memorial': return { title: '오늘은 기념일이 아닙니다', next: '다음 기념일까지' };
      case 'season': return { title: '오늘은 절기가 아닙니다', next: '다음 절기까지' };
      default: return { title: '오늘은 평일이에요', next: '다음 공휴일까지' };
    }
  };

  const message = getFilterMessage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="w-full max-w-3xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* 헤더 */}
          <div className="px-8 sm:px-12 pt-16 pb-12 space-y-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-gray-400" />
              <span className="text-gray-500">
                {new Date().toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long"
                })}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-gray-900 !text-4xl sm:!text-5xl !font-bold">
                {message.title}
              </h1>
              <p className="!text-lg text-gray-500 pl-1">
                하루하루 소중한 일상입니다
              </p>
            </div>
          </div>

          {/* 구분선 */}
          <div className="px-8 sm:px-12">
            <div className="h-px bg-gray-200" />
          </div>

          {/* 다음 항목 안내 */}
          <div className="px-8 sm:px-12 py-12 space-y-6">
            {nextHoliday ? (
              <>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <p className="!text-lg">{message.next}</p>
                </div>
                
                <div className="relative rounded-2xl p-10 overflow-hidden shadow-lg" style={{ background: nextHoliday.color }}>
                  <div className="absolute inset-0 bg-white/5" />
                  
                  <div className="relative z-10 space-y-6">
                    {/* D-Day */}
                    <div className="flex items-baseline gap-3">
                      <p className="!text-5xl sm:!text-6xl !font-bold text-white">
                        {daysUntil === 0 ? "오늘" : `D-${daysUntil}`}
                      </p>
                    </div>

                    {/* 항목 정보 */}
                    <div className="space-y-3">
                      <h2 className="text-white !text-3xl sm:!text-4xl !font-bold">
                        {nextHoliday.name}
                      </h2>
                      
                      <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="w-4 h-4" />
                        <p className="!text-lg">
                          {nextHoliday.month}월 {nextHoliday.day}일
                        </p>
                      </div>
                    </div>

                    {/* 구분선 */}
                    <div className="w-16 h-px bg-white/30 my-4" />

                    {/* 부제 */}
                    <p className="text-white/95 !text-lg leading-relaxed">
                      {nextHoliday.subtitle}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <p className="text-gray-600 !text-lg">
                  {filterType === 'all' ? '올해 남은 공휴일이 없습니다' : 
                   filterType === 'holiday' ? '올해 남은 공휴일이 없습니다' :
                   filterType === 'memorial' ? '올해 남은 기념일이 없습니다' :
                   '올해 남은 절기가 없습니다'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}