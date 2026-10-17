import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventsById } from "../api/ticketmaster";

function EventDetails(){
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {id} = useParams();

    useEffect(() => {
        async function loadEventDetails(){
            try{
                setLoading(true);
                setError("");
                const data = await fetchEventsById(id);
                setEvent(data);
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }
        loadEventDetails();
    }, [id]);
    let content;
    if(loading){
        content = <p>
            Loading...
        </p>
    }
    else if(error){
        content = <p className="error">{error}</p>
    }
    else if(!event){
        content = <p>Event Not Found.</p>
    }
    else{
        content = (<div className="event">
            <h2>{event.name}</h2>
            <p>{event.info}</p>
        </div>
        )
    }
    return(
        <div>
            <h1>
                EventDetails
            </h1>{content}
        </div>
    )
}
export default EventDetails;