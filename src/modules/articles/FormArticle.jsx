const FormArticle = () => {
    return(
    <>
    <form encType="multipart/form-data">
        <div>
            <label htmlFor="title">Title</label>
            <input type="text"/>
        </div>
        <div>
            <label htmlFor="articel">Article</label>
            <textarea cols={30}></textarea>
        </div>
    </form>
    </>);
}

export default FormArticle;