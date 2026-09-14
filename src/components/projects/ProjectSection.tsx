import React, { useState } from 'react';
import { projectsData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import type { ProjectData } from '../../types';
import { MultilingualMorph } from '../typography/MultilingualMorph';

export const ProjectSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null);

  return (
    <section id="projects" className="relative py-28 px-6 z-10">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        <div className="space-y-3 text-center md:text-left">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            DEEP WATER LAYER // 1,200m - 10,500m SUBSEA DISCOVERIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white">
            <MultilingualMorph translationKey="projectsTitle" highlightClass="text-gradient-cyan" />
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl font-mono">
            Intelligent systems engineered between algorithms, data streams, WebGL, and autonomous AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
