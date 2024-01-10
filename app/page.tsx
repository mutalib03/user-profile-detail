"use client"
import { Puff, Rings} from 'react-loading-icons'
import { useEffect, useState } from 'react';
import Image from 'next/image'  
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
export default function Home() {
  const [data, setData] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const result = await response.json();
        console.log(result.results[0])
        setData(result.results[0]);
      } catch (error) {
        console.error('error fetching data:', error);
      }
    };


    const intervalId = setInterval(fetchData, 5000)

    return () => clearInterval(intervalId)
  }, []);
  const iconStyle = {
    color: 'white',   
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width:"15px",
    height:"30px",
    padding: "2px 6px",
    borderRadius:"100%",
    margin:"10px 10px"
  };

  return (
    <div className="container">
      { data ? (
        <div className='detail-container'>
           <div className="header"><FaTimes style={iconStyle}/></div>
           <div className='main'>
             <Image src={data.picture.large}
      width={100}
      height={100}
      alt="Picture of the author"
      className="custom-image-class"
    />

    <p> Name: {`${data.name.first} ${data.name.last}`} </p>
    <p> Age: {`${data.registered.age} `} </p>
    <p> Username: {`${data.login.username} `} </p>
    <p> Phone no: {`${data.phone} `} </p>
    <p> Email: {`${data.email} `} </p>
    
    <p> Address: {`${data.location.street.number}, ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.country}.`} </p>
         
    <div className="links"> <Link className="custom-link" href="">Control Panel</Link> <span>.</span> <Link className="custom-link" href="">Subscription</Link> </div> 
    <div className="buttons"> <button>My account</button> <button>Sign out</button> </div>
           </div>
     

        </div>
      ) : (
        <svg width={400} height={500}>
        <Puff
          stroke="#98ff98"
          strokeOpacity={1}
          width={400}
          height={500}
        />
        <text x="50%" y="50%" fill="#98ff98" fontSize="20" textAnchor="middle" dominantBaseline="middle">
          Loading
        </text>
      </svg>
      )}
    </div>
  );
} 



