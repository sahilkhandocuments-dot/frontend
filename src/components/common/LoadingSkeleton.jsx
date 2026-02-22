import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSkeleton({ type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="glass-card p-0 rounded-xl overflow-hidden h-full">
        <div className="skeleton h-48 w-full" />
        <div className="p-4 space-y-3">
          <div className="skeleton h-6 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-10 w-full" />
        </div>
      </div>
    );
  }

  if (type === 'hero') {
    return (
      <div className="py-20 space-y-6">
        <div className="skeleton h-16 w-3/4 mx-auto" />
        <div className="skeleton h-6 w-1/2 mx-auto" />
        <div className="skeleton h-12 w-96 mx-auto" />
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="glass-card p-4 rounded-xl flex gap-4 items-center">
        <div className="skeleton h-20 w-20 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-6 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
        </div>
        <div className="skeleton h-10 w-24" />
      </div>
    );
  }

  return <div className="skeleton h-full w-full" />;
}

export function EventCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card p-0 rounded-xl overflow-hidden h-full"
    >
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-10 w-full" />
      </div>
    </motion.div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}
