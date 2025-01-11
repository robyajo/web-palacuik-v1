'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { FormInputIcon, Terminal } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
interface ResDevProps {
    response: any
}

function ResDEV({ response }: ResDevProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Atau tampilkan placeholder
    }
    return (
        <>
            <div className="fixed right-0 z-50 flex flex-col space-y-2 top-40">
                <Card>
                    <CardContent className="p-1">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    <Terminal className="w-4 h-4" />
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ScrollArea className="h-[300px]">
                                        <pre className="p-4 font-mono text-sm">
                                            {JSON.stringify(response, null, 2)}
                                        </pre>
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default ResDEV