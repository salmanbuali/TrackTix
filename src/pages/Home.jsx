import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRef } from "react"
import Client from "../services/api"

const Home = () => {
  // const [user, setUser] = useState({})

  const formRef = {
    // subject: useRef(null),
    // content: useRef(null),
    // priority: useRef("Urgent"),
    // attachments: useRef(null),
    // due: useRef(null),
    file: useRef(null),
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    let formData = new FormData()
    const upload = {
      file: formRef.file.current.files[0],
    }
    console.log(formRef.file.current.files[0])
    // event.target.files[0];
    await Client.post(`/upload`, upload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  const download = async () => {
    await Client.get("/download/20240222_142814.jpg", {
      "Content-Type": "multipart/form-data",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "20240222_142814.jpg")
      document.body.appendChild(link)
      link.click()
    })
  }

  return (
    <div>
      Home
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <input type="file" name="file" ref={formRef.file} required />
        <button type="submit">Upload</button>
      </form>
      <button onClick={download}>DOWNLOAD</button>
    </div>
  )
}

export default Home
