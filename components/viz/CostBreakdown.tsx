"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export interface CostItem {
  name: string;
  value: number;
  color?: string;
}

const DEFAULT_COLORS = ["#16a34a", "#22c55e", "#86efac", "#fbbf24", "#f97316", "#a78bfa"];

export function CostBreakdown({
  items,
  total,
  unit = "원",
}: {
  items: CostItem[];
  total?: string;
  unit?: string;
}) {
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="border-b bg-gray-50 px-5 py-3 flex items-center justify-between">
        <h4 className="text-sm font-bold text-gray-700">비용 구조</h4>
        {total && <span className="text-sm font-bold text-gov-700">합계 {total}</span>}
      </div>
      <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
        {/* 도넛 차트 */}
        <div className="w-48 h-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={items}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {items.map((item, i) => (
                  <Cell key={i} fill={item.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value.toLocaleString()}${unit}`, ""]}
                contentStyle={{ borderRadius: "8px", fontSize: "13px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* 범례 리스트 */}
        <div className="flex-1 w-full space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length] }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {item.value.toLocaleString()}{unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
