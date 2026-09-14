import React, { useState } from 'react';
import type { ProjectData } from '../../types';
import { oceanAudio } from '../../utils/audio';
import { Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

interface ProjectCardProps {
  project: ProjectData;
  onOpenModal: (project: ProjectData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        oceanAudio.playBubblePop();
      }}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col justify-between ocean-glass-deep p-6 sm:p-7 rounded-3xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-xl group cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transformStyle: 'preserve-3d'
      }}
      onClick={() => onOpenModal(project)}
    >
      <div className="flex items-center justify-between text-xs font-mono text-cyan-300 border-b border-cyan-500/15 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="font-bold">{project.depthMeters.toLocaleString()}m DEPTH</span>
        </div>
        <span className="text-[11px] text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
          {project.category}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <h3 className="text-2xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-cyan-400/90 font-medium">
          {project.subtitle}
        </p>
      </div>

      <p className="text-slate-300 text-sm font-body leading-relaxed mb-6 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.technologies.slice(0, 5).map(tech => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-lg bg-cyan-950/40 text-cyan-200 border border-cyan-500/20 text-[11px] font-mono"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="px-2 py-1 rounded-lg bg-slate-800/60 text-slate-400 text-[10px] font-mono">
            +{project.technologies.length - 5} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-cyan-500/15">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(project);
          }}
          className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 group-hover:text-white transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>EXPLORE LIVE SIMULATION</span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              oceanAudio.playBubblePop();
            }}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-all cursor-pointer"
            title="View GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
