import {Box,Button,Typography,styled} from "@mui/material"
import {useState } from "react"
import CircularProgress from '@mui/material/CircularProgress'


// My api key : ZJfXdCimnat0rbk1D9C4zEmTMUu6z8GYknuzAq27;
//api link : https://api.nasa.gov/planetary/apod?api_key=ZJfXdCimnat0rbk1D9C4zEmTMUu6z8GYknuzAq27


const Container = styled(Box)`
    padding:0px;
    margin:0px;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    & >button {
        margin-top:20px;
    }

    
`
const Word = styled(Typography)`
    color:white;
    font-size:70px;
    font-family: 'Roboto Slab'
`

const Home = ()=>{

    const [newres,setNewres] = useState("");
    const [date,setDate] = useState ("");
    const [click,setClick] = useState(false);

    const url = "https://api.nasa.gov/planetary/apod?api_key=ZJfXdCimnat0rbk1D9C4zEmTMUu6z8GYknuzAq27&date="

    const getImage = async(final)=>{
        const data = await fetch(`${url}${final}`)
        const result = await data.json();
        setNewres(result.hdurl);
        console.log(data);
        
    }
    const dateChanged = (e)=>{
        console.log(e.target.value);
        const finaldate = e.target.value;
        setDate(finaldate);
    }

    const loading = ()=>{
        getImage (date);
        setClick(true);
        closeLoading()

    }

    const closeLoading = ()=>{
        setTimeout (()=>{
            setClick(false)
        },2000)
    }
    


    return (
        <div>
            <Container style = {{backgroundImage: `url("${(newres)}")`,backgroundSize:"cover"}} >
                <Word>Astronomy Picture of the Day</Word>
                <p style={{color:"white",fontSize : "20px",marginBottom:"8px"}}>Select a date</p>
                <input type = "date" style = {{borderRadius:"9px",padding:"9px",fontSize:"18px"}} onChange = {(e)=>dateChanged(e)} ></input>
                <Button variant = "contained" style={{backgroundColor:"black",fontSize:"18px"}} onClick={(e)=>loading(e)}>Click</Button>
                {
                    click&&
                    <CircularProgress/>
                }
                

             
            </Container>
               
                
           
        </div>
    )
}

export default Home