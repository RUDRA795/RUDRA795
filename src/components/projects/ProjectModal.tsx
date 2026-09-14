import React from 'react';
import type { ProjectData } from '../../types';
import { oceanAudio } from '../../utils/audio';
import { X, Cpu, Activity, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { SonarScan3D } from '../3d/SonarScan3D';
import { ArgoGlobe3D } from '../3d/ArgoGlobe3D';
import { UrbanMap3D } from '../3d/UrbanMap3D';
import { GraphOpt3D } from '../3d/GraphOpt3D';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const renderVisualizer = () => {
    switch (project.interactiveMode) {
      case 'sonar':
        return <SonarScan3D />;
      case 'argo':
        return <ArgoGlobe3D />;
      case 'map':
        return <UrbanMap3D />;
      case 'graph':
        return <GraphOpt3D />;
      case 'agent':
        return (
          <div className="w-full max-w-2xl bg-[#010814] border border-cyan-500/25 rounded-2xl p-5 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-cyan-500/20 pb-2">
              <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> DHAMMU REASONING & VERIFICATION ENGINE</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">ACTIVE AGENT LOOP</span>
            </div>
            <div className="space-y-1.5 text-[11px] bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-cyan-200">
              <div>[PLANNER] Received instruction: "Orchestrate multi-step system verification"</div>
              <div>[DAG] Graph nodes: ToolSelection -&gt; ExecutionSandbox -&gt; AST Linter -&gt; Verification</div>
              <div>[DISPATCH] Sub-process spawned with memory boundary. Exit code 0.</div>
              <div className="text-emerald-300">[VERIFIED] Dynamic state verified without regressions.</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full max-w-2xl bg-cyan-950/30 border border-cyan-500/20 rounded-2xl p-6 text-center font-mono text-xs text-cyan-200">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-cyan-400 animate-spin" />
            <div className="font-bold text-sm text-white mb-1">{project.title} Telemetry Visualization</div>
            <div className="text-slate-400">{project.visualMetaphor}</div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto ocean-glass-deep p-6 sm:p-8 rounded-3xl border border-cyan-400/40 shadow-2xl space-y-6">
        <button
          onClick={() => {
            oceanAudio.playBubblePop();
            onClose();
          }}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-900/80 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 pr-12">
          <div className="flex items-center gap-3 text-xs font-mono text-cyan-400">
            <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/30">
              DEPTH: {project.depthMeters.toLocaleString()}m
            </span>
            <span className="text-slate-400">{project.category}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            {project.title}
          </h2>
          <p className="text-sm font-mono text-cyan-300">
            {project.subtitle}
          </p>
        </div>

        <div className="flex justify-center my-4">
          {renderVisualizer()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3 font-body text-sm text-slate-300 leading-relaxed bg-cyan-950/20 p-5 rounded-2xl border border-cyan-500/15">
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> ARCHITECTURAL CONCEPT
            </div>
            <p>{project.concept}</p>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-300 bg-cyan-950/20 p-5 rounded-2xl border border-cyan-500/15">
            <div className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> ALGORITHMS &amp; SYSTEMS
            </div>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
              {project.algorithms.map((algo, i) => (
                <li key={i}>{algo}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            TECHNICAL STACK &amp; FRAMEWORKS
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(t => (
              <span key={t} className="px-3 py-1.5 rounded-xl bg-cyan-950/50 text-cyan-200 border border-cyan-500/25 text-xs font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cyan-500/20">
          <div className="text-xs font-mono text-slate-400">
            METAPHOR: <span className="text-slate-200">{project.visualMetaphor}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => oceanAudio.playBubblePop()}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <GithubIcon className="w-4 h-4" />
              <span>EXPLORE REPOSITORY</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
