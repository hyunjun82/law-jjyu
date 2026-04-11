"use client";

import { useState } from "react";
import { ChevronDown, FileText, Check, CircleCheck } from "lucide-react";

export interface ChecklistGroup {
  title: string;
  items: string[];
}

export function AccordionChecklist({ groups }: { groups: ChecklistGroup[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 그룹별 완료 여부 계산
  const groupCompletion = groups.map((group, gi) =>
    group.items.every((_, ii) => !!checked[`${gi}-${ii}`])
  );
  const completedGroups = groupCompletion.filter(Boolean).length;
  const allDone = completedGroups === groups.length;

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* 상단 진행 상태 */}
      <div className="border-b bg-gray-50 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gov-600" />
          <h4 className="text-sm font-bold text-gray-700">준비 서류 체크리스트</h4>
        </div>
        <span className={`text-xs font-medium ${allDone ? "text-green-600" : "text-gray-400"}`}>
          {completedGroups}/{groups.length} 항목 완료
        </span>
      </div>
      {/* 진행 바 */}
      <div className="h-1 bg-gray-100">
        <div
          className={`h-1 transition-all duration-300 ${allDone ? "bg-green-500" : "bg-gov-500"}`}
          style={{ width: `${groups.length ? (completedGroups / groups.length) * 100 : 0}%` }}
        />
      </div>
      {/* 아코디언 그룹 */}
      <div className="divide-y divide-gray-100">
        {groups.map((group, gi) => {
          const groupDone = groupCompletion[gi];
          const groupChecked = group.items.filter((_, ii) => !!checked[`${gi}-${ii}`]).length;
          return (
            <div key={gi}>
              <button
                onClick={() => setOpenIndex(openIndex === gi ? null : gi)}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {groupDone && <CircleCheck className="h-4 w-4 text-green-500 shrink-0" />}
                  <span className={`text-sm font-medium ${groupDone ? "text-green-700" : "text-gray-800"}`}>
                    {group.title}
                  </span>
                  {!groupDone && (
                    <span className="text-xs text-gray-400">
                      {groupChecked}/{group.items.length}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    openIndex === gi ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === gi ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="px-5 pb-4 space-y-1">
                  {group.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    const isChecked = !!checked[key];
                    return (
                      <label
                        key={ii}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            toggleCheck(key);
                          }}
                          className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors shrink-0 ${
                            isChecked
                              ? "bg-gov-600 border-gov-600"
                              : "border-gray-300 hover:border-gov-400"
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span
                          className={`text-sm transition-colors ${
                            isChecked ? "text-gray-400 line-through" : "text-gray-700"
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                    );
                  })}
                  {/* 그룹 완료 메시지 */}
                  {groupDone && (
                    <div className="mt-2 px-3 py-2 bg-green-50 rounded-lg text-sm text-green-700 font-medium">
                      준비 완료
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 전체 완료 메시지 */}
      {allDone && (
        <div className="border-t bg-green-50 px-5 py-4 text-center">
          <p className="text-sm font-bold text-green-700">모든 서류 준비 완료</p>
          <p className="text-xs text-green-600 mt-1">체크한 서류를 들고 방문하세요</p>
        </div>
      )}
    </div>
  );
}
