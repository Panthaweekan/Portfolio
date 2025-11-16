import { m, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase } from 'lucide-react';

interface TimelineItem {
  title: string;
  company: string;
  period: string;
  location: string;
  technologies?: string;
  description: string[];
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
}

export function AnimatedTimeline({ items }: AnimatedTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-secondary transform md:-translate-x-1/2" />

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineItemComponent key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItemComponent({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline dot */}
      <m.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 animate-glow"
      />

      {/* Content */}
      <div className={`w-full md:w-5/12 ml-8 md:ml-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          className="bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
              <p className="text-base font-semibold text-primary">{item.company}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm text-muted-foreground">{item.period}</p>
            <p className="text-sm text-muted-foreground">{item.location}</p>
            {item.technologies && (
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-xs font-semibold text-foreground/70 mb-1">Technologies:</p>
                <p className="text-sm text-foreground/90">{item.technologies}</p>
              </div>
            )}
          </div>

          <ul className="space-y-2">
            {item.description.map((desc, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <span className="mr-2 text-primary font-bold">•</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </m.div>
      </div>
    </m.div>
  );
}
