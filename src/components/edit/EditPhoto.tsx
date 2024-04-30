import { useParams } from 'react-router-dom';


const EditPhoto = () => {
    const {id} = useParams();

    return (
        <div>
            Edit Photo with ID: {id}
        </div>
    )
}

export default EditPhoto;