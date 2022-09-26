import { useEffect } from "react";


const About = () => {

    useEffect(() => {
        document.title = "O projektu"
    })
    
    return (
        <>
            <section class="about-us py-4 " id="about-us">
            <div class="container mt-5 animate__animated pulse">
                <div class="row">
                    <div class="col-md-6">
                        <h1 class='text'>Dobro došli!</h1>
                        <p>Pozdrav i dobro došli na moju aplikaciju iz Završnog projekta. Zovem se Imran i student sam druge godine na Prirodno-matematičkom fakultetu na smjeru Informacione tehnologije.</p>
                        <p>U mojoj web aplikaciji DevNet je moguće registrovati i ulogovati se kao korisnik te objavljivati, lajkati objave kao i dopisivati se. Pored toga, moguće je pregledati druge profile kao i dopisivati se sa prijateljima.</p>
                        <p>Za realizaciju projekta koristio sam sljedeće tehnologije: </p>
                        <ul>
                            <li><b>Node.js</b> za backend</li>
                            <li><b>React.js</b> za frontend</li>
                            <li><b>Mongo</b> kao bazu</li>
                            <li><b>CSS</b></li>
                            <li><b>Paketi : React-Favicon, React-Icons, Socket.io, SweetAlert2, Axios, Bcrypt, Mongoose..</b></li>
                        </ul>
                    
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Naziv predmeta</th>
                                <th scope="col">Završni projekat</th>    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">Semestar</th>
                                <td colspan="2">IV</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div class="col-md-6">
                        <img class="img-fluid" id="mojaSlika" src="/DEVNET.png"alt="" />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default About;