import Avatar from '../../../src/assets/images/Avatar.png'

const FirstInstruction = () => {
    return (
        <div className="hero bg-base-300 min-h-full">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={Avatar}
                    className="max-w-xs rounded-lg " />
                <div>
                    <h1 className="text-5xl font-bold">Welcome!</h1>
                    <p className="py-6">
                        Thank you for choosing to engage with us. Before we begin, we kindly ask you to provide some demographic information. This data will help us better understand your circumstances and contribute valuable insights for our research.
                    </p>
                    <p>When you are ready, please click <strong>Next</strong> to proceed.</p>
                </div>
            </div>
        </div>
    )
}
export default FirstInstruction;