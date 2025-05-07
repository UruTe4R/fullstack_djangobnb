'use client'

import styles from "./properties.module.css";
import { useState, useEffect } from 'react';

import apiService from "@/app/services/apiService";

import PropertyListItem from "@/app/components/properties/PropertyListItem";
import Link from 'next/link';
import useAuthStore from "@/app/hooks/useAuthStore";

export type PropertyType = {
  id: string; 
  title: string;
  image_url: string;
  price_per_night: number;
  is_liked: boolean;
}

interface PropertyListProps {
  landlord_id?: string | null;
  userId: string | null;
}

export default function PropertyList({ landlord_id, userId }: PropertyListProps) {
  const [ properties, setProperties ] = useState<PropertyType[]>([]);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  function like(id: string, is_liked: boolean) {
    const tmpProperties = properties.map((property) => {
      if (property.id === id) {

        if (is_liked) {
          console.log('added to list of liked properties');
        } else {
          console.log('removed from list of liked properties');
        }
        return {
          ...property,
          is_liked
        }
      }
      return property;
    })
    setProperties(tmpProperties);
  }

  useEffect(() => {
    async function getProperties() {

      let url = '/api/properties';
      if (landlord_id) {
        url += `?landlord_id=${landlord_id}`
      }
      let response;
      if (userId) {
        response = await apiService.getWithCredentials(url);
      } else {
        response = await apiService.get(url);
      }
      console.log('response(getProperties)', response.data);
      setProperties(response.data);
    }

    getProperties();
  }, [isLoggedIn, userId]);
  return (
    <>
      {properties.map((property) => {
        return (
          <Link key={property.id} href={`/properties/${property.id}`}>  
            <PropertyListItem 
              key={property.id}
              property={property}
              like={(is_liked: boolean) => like(property.id, is_liked) }
            />
          </Link>
        )
      })}
      
    </>
  )
}