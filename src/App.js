import React from "react"
import logo from './logo.svg';
import './App.css';

function App() {

  // State to hold our posts
  const [postings, setPostings] = React.useState([])

  // State to hold formData
  const [createForm, setCreateForm] = React.useState({
    name: "",
    neighborhood: "",
    crime_type: ""
  })

  // Function to make api call to get posts
  const getPostings = async () => {
    const response = await fetch("http://localhost:3000/postings")
    const data = await response.json()
    // reverse sets new input at top
    setPostings(data.reverse())
  }

  // this is going to run getNotices function when the component loads
  React.useEffect(() => {
    getPostings()
  }, [])


  // Renders the jsx for when the notices are loaded
  const loaded = () => (
    <>
    {postings.map((posting) => {
      return (
        <div>
        <h3>{posting.name}</h3>
        <h3>{posting.neighborhood}</h3>
        <h3>{posting.crime_type}</h3>
        <h3>{posting.short_desc}</h3>
        <h3>{posting.cross_street}</h3>
        <button onClick={async () => {
          //Make delete request
          await fetch("http://localhost:3000/postings/" + posting.id, {
            method: "delete"
          })
          //get updated list of posting
          getPostings()
        }}>Delete</button>
      </div>
      )
    })}
    </>
  )

  // Our handle change function for create form
  const createChange = (event) => {
    setCreateForm({...createForm, [event.target.name]:event.target.value})
  }

  // Handle create function, for when the form is submitted
  const handleCreate = async (event) => {
    event.preventDefault() //prevent page refresh
    // Making the post request to make a new notice
    await fetch("http://localhost:3000/postings", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(createForm)
    })
    // Fetching an updated list of posts
    getPostings()
    // Resets inputs to blank
    setCreateForm({
      name: "",
      neighborhood: "",
      crime_type: "",
      short_desc: "",
      cross_street: ""
    })
  }

  return (
    <div className="App">
      <h1>Add New Posting</h1>
      <form onSubmit={handleCreate}>
        <input type="text" name="name" value={createForm.name} onChange={createChange}/>
        <input type="text" name="neighborhood" value={createForm.neighborhood} onChange={createChange}/>
        <input type="text" name="crime_type" value={createForm.crime_type} onChange={createChange}/>
        <input type="text" name="short_desc" value={createForm.short_desc} onChange={createChange}/>
        <input type="text" name="cross_street" value={createForm.cross_street} onChange={createChange}/>
        <input type="submit" value="Create Posting"/>
      </form>
      <h1>Community Postings</h1>
      {postings.length > 0 ? loaded() : <h2>There are no Community Posts</h2>}
    </div>
  );
}

export default App;