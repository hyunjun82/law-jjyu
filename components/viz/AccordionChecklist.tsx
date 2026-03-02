"use client";

import { useState } from "react";
import { ChevronDown, FileText, Check } from "lucide-react";

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

  const totalItems = groups.reduce((acc, g) => acc + g.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* 상단 진행 상태 */}
      <div className="border-b bg-gray-50 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gov-600" />
          <h4 className="text-sm font-bold text-gray-700">준비 서류 체크리스트</h4>
        </div>
        <span className="text-xs font-medium text-gray-400">
          {checkedCount}/{totalItems} 완료
        </span>
      </div>
      {/* 진행 바 */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-1 bg-gov-500 transition-all duration-300"
          style={{ width: `${totalItems ? (checkedCount / totalItems) * 100 : 0}%` }}
        />
      </div>
      {/* 아코디언 그룹 */}
      <div className="divide-y divide-gray-100">
        {groups.map((group, gi) => (
          <div key={gi}>
            <button
              onClick={() => setOpenIndex(openIndex === gi ? null : gi)}
              className="flex w-full items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800">{group.title}</span>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
