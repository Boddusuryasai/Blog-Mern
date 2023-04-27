
import Comment from "./Comments"


const CommentsList = ({comments,getPost})=>{
     
    return (
            comments?.map((comment,i)=>{
                return (
                    <div key={i} className="mt-1">
                        <Comment comments={comment} getPost={getPost} />
                        <div className='ml-4'>
                            <CommentsList comments={comment.comments} getPost={getPost}/>
                        </div>
                    </div>
                )
            })
        
    )
  }
  export default CommentsList