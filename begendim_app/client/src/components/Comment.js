import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"
import ResComment from "./ResComment";

function Comment(params) {

  const [comment, setComment] = useState({ userComment: "", userId: "" })
  const [getComments, setGetComments] = useState("")
  const [getResComments, setGetResComments] = useState("")

  // Notification paketi => Sweetalert2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    getAllComments();
    
  }, []);

  //console.log(getResComments)

  const createComment = async (e) => {
    e.preventDefault()
    const newComment = { ...comment, userId: params.data.user._id }
    const productDomain = window.location.href;
    const productId = productDomain.split("/");

    await axios.post(`http://localhost:3001/comments/${productId[4]}`, newComment).
      then((res) => {
        console.log(res)
        Toast.fire({
          text: "Message succesfully created!",
          icon: "success"
        })
        setComment(newComment)
      }).
      catch((err) => {
        Toast.fire({
          text: "Something went wrong!",
          icon: "error"
        })
        
      })
    getAllComments()
  }
  const getAllComments = async (a) => {
    const productDomain = window.location.href;
    const productId = productDomain.split("/");
    const result = await axios.get(`http://localhost:3001/comments/${productId[4]}`);
    setGetComments(result.data.comments);
    setGetResComments(result.data.responseComment);
  }

 

  return (
    <div className="col-lg-5 bg-info bg-opacity-25 rounded-3" >
      <h4 className=" mt-2 text-center">Yorum Yapın</h4>

      <form onSubmit={createComment} >
        <textarea className="form-control" id="exampleFormControlTextarea1" value={comment.userComment} rows="3"
          onChange={(e) => setComment({ ...comment, userComment: e.target.value })} placeholder="Yorum yapınız..."></textarea>
        <button className="btn btn-primary w-100 mt-2" type="submit"  >Yorumu Yayınla</button>

      </form>


      <div>

        <section >

          <div className="container my-2 py-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 col-lg-10 col-xl-8  w-100">
                <div className="card ">
                  <div className="card-body p-4 ">
                    <h4 className="text-center mb-2 pb-2">Yorumlar</h4>

                    <div className="row">
                      <div className="col">
                        {getComments && getComments.map((comment) => {
                          //   console.log(comment.resComment)
                          //      let responseComment = !comment.resComment.length==0  ? ( getResComments && getResComments.find(item => item._id === comment.resComment[0])):"";

                          let responseComment = []
                          if (!comment.resComment.length == 0 && getResComments) {
                            for (let i = 0; i < comment.resComment.length; i++) {
                              responseComment.push(getResComments.find(item => item._id === comment.resComment[i]))
                            }
                          } else {
                            responseComment = []
                          }
                          //     console.log(responseComment)

                          return (

                            <div key={comment._id} className="d-flex flex-start mt-3">
                              <img className="rounded-circle shadow-1-strong me-3"
                                src={comment.userImage} alt="avatar" width="65"
                                height="65" />
                              <div className="flex-grow-1 flex-shrink-1">
                                <div >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                      {comment.username} <span className="small">- 2 hours ago</span>
                                    </p>
                                  </div>
                                  <p className="small mb-0">
                                    {comment.userComment}
                                  </p>

                                  <div >

                                    {!responseComment == "" ? responseComment.map((item) => {

                                      return (
                                        <div className={`d-flex flex-start mt-3 `}>
                                          <img className="rounded-circle shadow-1-strong me-3"
                                            src={item.userImage} alt="avatar" width="65"
                                            height="65" />
                                          <div className="flex-grow-1 flex-shrink-1">
                                            <div >
                                              <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                  {item.username} <span className="small">- 2 hours ago</span>
                                                </p>
                                              </div>
                                              <p className="small mb-0">
                                                {item.resComment}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    }) : <div></div>}
                                  </div>

                                  <div  >

                                    {params.data ? <ResComment data={comment} user={params.data} getAllComments={getAllComments} /> : <div></div>}

                                  </div>
                                </div>
                              </div>
                            </div>

                          )
                        })}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Comment