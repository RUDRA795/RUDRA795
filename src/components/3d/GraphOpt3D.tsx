import React, { useState } from 'react';
import { oceanAudio } from '../../utils/audio';

export const GraphOpt3D: React.FC = () => {
  const [optimalPath, setOptimalPath] = useState<string[]>(['Patient Admission', 'Triage Vector', 'Dr. Sharma (Cardio)', 'Echo Lab Slot #2', 'Discharge']);
  const [totalWaitReduction, setTotalWaitReduction] = useState<number>(42);
  const [calculating, setCalculating] = useState<boolean>(false);

  const stages = [
    { name: "Stage 0: Intake", nodes: ["Patient Admission", "Emergency Flag", "Tele-Checkin"] },
    { name: "Stage 1: Triage AI", nodes: ["Triage Vector", "Priority Urgency B", "Fast-Track Routine"] },
    { name: "Stage 2: Specialist Routing", nodes: ["Dr. Sharma (Cardio)", "Dr. Patil (Neuro)", "Dr. Verma (General)"] },
    { name: "Stage 3: Diagnostics", nodes: ["Echo Lab Slot #2", "CT Scan Bay #1", "Biochemical Lab"] },
    { name: "Stage 4: Resolution", nodes: ["Discharge", "Inpatient Bed #14", "Prescription Counter"] }
  ];

  const optimize = () => {
    oceanAudio.playSonarBeep();
    setCalculating(true);
    setTimeout(() => {
      const paths = [
        ['Patient Admission', 'Triage Vector', 'Dr. Sharma (Cardio)', 'Echo Lab Slot #2', 'Discharge'],
        ['Tele-Checkin', 'Priority Urgency B', 'Dr. Patil (Neuro)', 'CT Scan Bay #1', 'Inpatient Bed #14'],
        ['Emergency Flag', 'Triage Vector', 'Dr. Verma (General)', 'Biochemical Lab', 'Prescription Counter']
      ];
      setOptimalPath(paths[Math.floor(Math.random() * paths.length)]);
      setTotalWaitReduction(38 + Math.floor(Math.random() * 15));
      setCalculating(false);
    }, 450);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl bg-[#020b18]/95 border border-cyan-500/25 rounded-2xl p-5 shadow-2xl font-mono text-xs">
      <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3">
        <div className="text-cyan-300 font-bold flex items-center gap-2">
          <span>🩺</span> OPTICURE MULTI-STAGE GRAPH HEURISTIC
        </div>
        <div className="text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30 text-[11px]">
          WAIT REDUCTION: -{totalWaitReduction}%
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-2">
        {stages.map((stage) => (
          <div key={stage.name} className="flex flex-col gap-2">
            <div className="text-[10px] text-cyan-400/80 font-bold truncate">{stage.name}</div>
            <div className="flex flex-col gap-1.5">
              {stage.nodes.map(node => {
                const isOptimal = optimalPath.includes(node);
                return (
                  <div
                    key={node}
                    className={`p-2 rounded-lg border text-[10px] transition-all ${
                      isOptimal
                        ? 'bg-cyan-500/25 border-cyan-300 text-cyan-100 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    {node}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div className="text-slate-400 text-[11px]">
          Active DAG Route: <span className="text-cyan-300 font-semibold">{optimalPath.join(' → ')}</span>
        </div>
        <button
          onClick={optimize}
          disabled={calculating}
          className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {calculating ? "Recalculating..." : "⚡ Re-Optimize Graph"}
        </button>
      </div>
    </div>
  );
};
