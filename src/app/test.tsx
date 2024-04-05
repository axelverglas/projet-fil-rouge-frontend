'use client'

export default function Test({user}: {user: any}) {
  const handleupload = async (e: any) => {
    console.log(e.target.files)
    console.log(user?._id)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(
      `http://127.0.0.1:5000/api/v1/user/${user?._id}/avatar`,
      {
        method: 'POST',
        body: formData
      }
    )
    const result = await res.json()
    console.log(result)
  }
  return (
    <div>
      <input type="file" onChange={handleupload} />
    </div>
  )
}
