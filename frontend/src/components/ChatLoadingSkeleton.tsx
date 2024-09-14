const ChatLoadingSkeleton = () => {

  if(1===1){
    return (
      <div className="flex items-center justify-center p-10">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )
  }

    return(
        
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(dig => {
                if(dig % 2 == 0){
                    return (
                        <div key={dig} className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full skeleton">
                                </div>
                            </div>
                            <div className="chat-bubble w-4/12 h-[5rem] skeleton"></div>
                        </div>
                    )
                }else{
                    return(
                    <div key={dig} className="chat chat-end">
                        <div className="chat-bubble w-5/12 h-[2rem] skeleton"></div>
                    </div>
                      )
                }
            })
        
    )
}

export default ChatLoadingSkeleton;


/*
<div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
    Obi-Wan Kenobi
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">You were the Chosen One!</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">Seen at 12:46</div>
</div>

*/ 