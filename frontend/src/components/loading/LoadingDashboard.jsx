import React from 'react';

export default function LoadingDashboard() {
    return (
        <div className="w-full h-96 bg-base border highlight-white rounded-xl p-4">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-txt-depressed h-20 w-20"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-txt-depressed rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-txt-depressed rounded col-span-2"></div>
                            <div className="h-2 bg-txt-depressed rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-txt-depressed rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
