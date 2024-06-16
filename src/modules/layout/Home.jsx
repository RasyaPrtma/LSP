import video from '../../assets/bg.mp4'
import layer from '../../assets/layer.jpg'
const Home = () => {
    return (
        <>
            <section className="home">
                <video autoPlay muted loop>
                    <source src={video} />
                </video>
                <div className="absolute top-[35%] bottom-[50%] left-[15vw] z-[10] flex gap-[2rem] items-center">
                    <div className="text">
                        <h1 className='text-[3em] font-bold text-[#F8F8F8]'>WELCOME TO ARTICULATE</h1>
                        <p className='text-[1em] font-medium text-[#F8F8F8]'>Articulate Adalah Website Untuk Kalian Berbagi Informasi Berupa Artikel Atau Informasi Menarik Lainnya <br />Sehingga Kalian Bisa Berbagi Ilmu Atau Pengetahuan Disini Ayo Coba</p>
                    </div>
                    <span className='relative layer-img w-[450px] h-[450px] rounded-lg'>
                    <img src={layer} className='width-[100%] h-[100%] object-cover ml-[5em] rounded-xl shadow-2xl shadow-[rgba(255,255,255,0.8)]'/>
                    </span>
                </div>
            </section>
        </>
    );
}

export default Home;