

function ImagenLogo(){

    return(
        <center>
            <img src={process.env.PUBLIC_URL + '/logo.jpg'} alt="logo" height="250px"/>
        </center>
    )
}

export default ImagenLogo;