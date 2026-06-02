
export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">      
        <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong.</h1>
        <p className="text-lg text-red-500">Please try refreshing the page or come back later.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Try Again
        </button>
    </div>
  );
}