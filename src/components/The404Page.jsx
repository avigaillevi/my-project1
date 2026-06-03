 export default function NotFoundPage({refetch}) {
    return (
                  <div className="col-span-full flex flex-col items-center gap-4">
            <img
              src="/images/page-not-found.svg"
              alt="page not found"
              className="w-64"
            />

            <h2 className="text-2xl font-bold text-indigo-700">
              page Not Found
            </h2>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-full"
            >
              Try Again
            </button>
          </div>
    )
}