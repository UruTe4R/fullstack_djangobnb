'use client'

import styles from "./properties.module.css";
import { useState, useEffect } from 'react';

import apiService from "@/app/services/apiService";

import PropertyListItem from "@/app/components/properties/PropertyListItem";
import Link from 'next/link';

export type PropertyType = {
  id: string; 
  title: string;
  image_url: string;
  price_per_night: number;
}

export default function PropertyList() {
  const [ properties, setProperties ] = useState<PropertyType[]>([]);

  useEffect(() => {
    const url = '/api/properties'
    apiService.get(url).then((response) => setProperties(response.data)).catch(error => console.log(error))
  }, []);
  return (
    <>
      {properties.map((property) => {
        return (
          <Link key={property.id} href={`/properties/${property.id}`}>  
            <PropertyListItem 
              key={property.id}
              property={property}
            />
          </Link>
        )
      })}
      
    </>
  )
}