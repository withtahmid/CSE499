const FirstInstruction = () => {
    return (
        <div className="hero bg-base-300 min-h-full">
            <div className="hero-content flex-col lg:flex-row">
                <img
                src="/src/assets/images/Wall-E.png"
                className="max-w-xs rounded-lg " />
                <div>
                <h1 className="text-5xl font-bold">hello!</h1>
                <p className="py-6">
                Before we begin, we kindly ask you to provide some background information. This personal metadata will help us better understand your circumstances and provide valuable insights for our research.
                </p>
                <p>Please click <strong>Next</strong> when you are ready to proceed.</p>
                </div>
            </div>
        </div>
)
}
export default FirstInstruction;