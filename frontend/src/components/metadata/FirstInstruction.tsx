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
                        You’ve taken a great step towards your mental well-being! I'm BondhuBot, your friendly mental health assistant. To help us understand your circumstances better, we will ask you for some demographic information before we began chatting.
                    </p>
                    <p>When you are ready, please click <strong>Next</strong> to proceed.</p>
                </div>
            </div>
        </div>
    )
}
export default FirstInstruction;