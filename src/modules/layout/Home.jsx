import { useEffect } from 'react';
import video from '../../assets/bg.mp4'
import layer from '../../assets/layer.jpg'
import { useArticle } from '../articles/ArticleContext';
const Home = () => {

    const {getAll} = useArticle();

    const arr = [
        {   
            id:1,
            nama:"rasya"
        },
        {
            id:2,
            nama:"rasya"
        },
        {
            id:3,
            nama:"rasya"
        }
    ];

    useEffect(() => {
        getAll()
    })

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
            <section className='article'>
                {
                    arr.map((val) => (
                        <ul key={val.id} className='w-[350px] h-[auto] bg-[#5e5e5e] rounded-lg flex flex-col items-center gap-[10px]'>
                            <li><img className='w-[100%] object-cover rounded-t-lg' src="https://platinumlist.net/guide/wp-content/uploads/2023/03/8359_img_worlds_of_adventure-big1613913137.jpg-1024x683.webp" alt="" /></li>
                            <li className='text-[#0c0e0ce7] uppercase font-semibold text-[1.1em]'>{val.nama}</li>
                            <li className='text-[#0c0e0ce7] font-medium text-[1.10em]'>{val.nama}</li>
                            <li className='text-[#0c0e0ce7] font-thin text-[14px]'>Uploaded At : {val.nama}</li>
                        </ul>
                    ))
                }
            </section>
        </>
    );
}

export default Home;