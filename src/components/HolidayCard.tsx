import { Holiday } from "../data/holidays";
import { motion } from "motion/react";
import { Calendar, BookOpen, MessageCircle } from "lucide-react";

interface HolidayCardProps {
  holiday: Holiday;
}

export function HolidayCard({ holiday }: HolidayCardProps) {
  // type에 따른 한글 표시와 색상
  const getTypeBadge = () => {
    switch (holiday.type) {
      case 'holiday': 
        return { label: '공휴일', color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-700' };
      case 'memorial': 
        return { label: '기념일', color: 'bg-purple-500', lightColor: 'bg-purple-50', textColor: 'text-purple-700' };
      case 'season': 
        return { label: '절기', color: 'bg-green-500', lightColor: 'bg-green-50', textColor: 'text-green-700' };
      default: 
        return { label: '공휴일', color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-700' };
    }
  };

  const badge = getTypeBadge();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden" style={{ background: holiday.color }}>
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <motion.div
        className="w-full max-w-4xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* 헤더 섹션 */}
          <div className="relative px-8 sm:px-12 pt-16 pb-12">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: holiday.color }} />
            
            <div className="space-y-6">
              {/* 날짜와 타입 배지 */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 !text-lg">{holiday.month}월 {holiday.day}일</span>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full ${badge.lightColor} ${badge.textColor} !text-sm !font-medium`}>
                  {badge.label}
                </span>
              </div>

              {/* 제목 */}
              <div className="space-y-3">
                <h1 className="text-gray-900 !text-5xl sm:!text-6xl md:!text-7xl !font-bold tracking-tight">{holiday.name}</h1>
                <p className="!text-xl sm:!text-2xl text-gray-600 pl-1">{holiday.subtitle}</p>
              </div>
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="px-8 sm:px-12 pb-16 space-y-8">
            {/* 설명 섹션 */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="mt-1">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-gray-900 !text-lg !font-semibold">이 날은</h3>
                  <p className="text-gray-700 leading-relaxed">{holiday.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="mt-1">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <BookOpen className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-gray-900 !text-lg !font-semibold">유래</h3>
                  <p className="text-gray-700 leading-relaxed">{holiday.history}</p>
                  <p className="text-gray-500 !text-sm pt-1">{holiday.year}</p>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4">
                  <MessageCircle className="w-5 h-5 text-gray-300" />
                </span>
              </div>
            </div>

            {/* 질문 섹션 */}
            <div className="text-center py-8 px-6 sm:px-12">
              <p className="!text-2xl sm:!text-3xl text-gray-800 leading-relaxed">
                {holiday.question}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}