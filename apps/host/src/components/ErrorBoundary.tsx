import React from 'react';

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-950/80 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center m-6 min-h-[400px]">
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">MFE Load Error</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mb-6">
            Something went wrong while rendering this micro-frontend component.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition font-medium text-sm shadow-md"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
