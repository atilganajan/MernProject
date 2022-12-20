import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from "sweetalert2"

function ResComment(params) {
    const [answerComment, setAnswerComment] = useState({ commentId: "", resComment: "", userId: "" })

    const commentId = params && params.data._id;

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


    const sendRespondComment = (e, ownerComment) => {
        e.preventDefault()

        const createResComment = ({ ...answerComment, commentId: ownerComment, userId: params && params.user.user._id })
        const productDomain = window.location.href;
        const productId = productDomain.split("/");
        // console.log(createResComment)
        axios.post(`http://localhost:3001/rescomments/${productId[4]}`, createResComment)
            .then((res) => {
                console.log(res)
                Toast.fire({
                    text: "Message succesfully created!",
                    icon: "success"
                  })
                setAnswerComment(res.data.createdResComment)
            }).catch((err) =>   Toast.fire({
                text: "Something went wrong!",
                icon: "error"
              }))

            // ------------ BURAYA BAK -----------
            params.getAllComments()
            // ---------------------------
    }


    return (

        <div>
            <form  >
                <textarea className="form-control mt-3 mb-2" rows="1" placeholder="Cevap Yaz..."
                    onFocus={(e) => {
                        e.target.classList.add("target")
                        e.target.classList.contains("target") && e.addEventListener("value", () => answerComment.resComment)
                    }}
                    onChange={(e) => setAnswerComment({ ...answerComment, resComment: e.target.value })} ></textarea>

                <button className="btn btn-primary float-end " onClick={(event) => sendRespondComment(event, commentId)}  > Tamamla</button>
            </form>
        </div>
    )
}

export default ResComment