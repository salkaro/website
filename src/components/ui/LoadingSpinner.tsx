const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen col-span-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        </div>
    )
}

export default LoadingSpinner