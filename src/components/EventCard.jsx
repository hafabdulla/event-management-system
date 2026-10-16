import { Link } from "react-router-dom";
function EventCard({event}){
    const image = event.images?.[0]?.url;
    const venue = event._embedded?.venues?.[0]?.name??"Venue TBA";
    const city = event._embedded?.venues?.[0]?.city?.name;
    const category = event.classifications?.[0]?.segment?.name?? "other";
    const date = event.dates?.start?.localDate??"Date TBA";
    const time = event.dates?.start?.localTime;
    return (
        <Link to={"/events/" + event.id} className="event-card">
            {image ?(
                <img src = {image} alt={event.name} loading = "lazy"/>
            ): (
                <div className="event-card-noimage">No image</div>
            )}
        <div className="event-card-body">
            <span className="event-card-category">{category}</span>
            <h3>{event.name}</h3>
            <p>{date} : {time}</p>
            <p>{city? `${venue}, ${city}`: venue}</p>
        </div>
        </Link>
    );
}

export default EventCard;