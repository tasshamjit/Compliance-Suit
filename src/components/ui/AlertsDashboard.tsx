"use client"; // This marks the component as a client component

import React from 'react';
import useSWR from 'swr';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Ensure the path is correct

interface AlertData {
  id: string;
  title: string;
  description: string;
  variant: 'DEFAULT' | 'DESTRUCTIVE';
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AlertsDashboard: React.FC = () => {
  const { data: alerts, error } = useSWR<AlertData[]>('/api/alerts', fetcher, {
    refreshInterval: 5000, // Revalidate every 5 seconds
  });

  if (error) return <div>Failed to load alerts</div>;
  if (!alerts) return <div>Loading...</div>;

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {alerts.map((alert) => (
        <AccordionItem key={alert.id} value={alert.id} className="accordion-item">
          <AccordionTrigger className="accordion-trigger">
            <div>
              <h3 className="font-medium text-lg">{alert.title}</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="accordion-content">
            <p>{alert.description}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
      {alerts.length === 0 && <div>No alerts found</div>}
    </Accordion>
  );
};

export default AlertsDashboard;
