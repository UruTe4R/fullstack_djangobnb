'use client'

import Image from 'next/image';
import styles from './modal.module.css';
import { useState } from 'react';
import { useImmer } from 'use-immer';

import Modal from './Modal';
import usePropertyModal from '@/app/hooks/usePropertyModal';
import CustomButton from '@/app/components/forms/CustomButton';
import Categories from '@/app/components/addproperty/Categories';
import SelectCountry from '@/app/components/forms/SelectCountry';
// api
import apiService from '@/app/services/apiService';

//type
import {SelectCountryValue} from '@/app/components/forms/SelectCountry' ;
import { useRouter } from 'next/navigation';


export default function AddPropertyModal() {
  const router = useRouter();
  // step state
  const [currentStep, setCurrentStep] = useState(1);

  // form state
  const [formData, updateFormData] = useImmer({
    category: '',
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    guests: '',
    country: {
      value: '',
      label: ''
    } as SelectCountryValue,
    image: null as File | null,
  });
  
  const [errors, setErrors] = useState<string[]>([]);
  

  // modal control
  const isOpen = usePropertyModal((state) => state.isOpen);
  const close = usePropertyModal((state) => state.close);

  // update category separately
  const setCategory = (category: string) => {
    updateFormData(draft => {
      draft.category = category;
    });
  };

  const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const tmpImage = e.target.files[0];

      updateFormData(d => {
        d.image = tmpImage;
      })
    }
  }

  // Submit
  const submitForm = async () => {
    const form = new FormData();
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (value) {
        if (key === 'country') {
          const country = value as SelectCountryValue;

          form.append('country', country.label);
          form.append('country_code', country.value)
        } else if (key === 'image') {
          form.append(key, value as File); // skip if null already handled
        } else if (key === 'price') {
          form.append('price_per_night', value as string);
        }  else {
          form.append(key, value as string);
        }
      }
    }
    const response = await apiService.postWithCredentials('/api/properties/create/', form);

    if (response.success) {
      console.log('SUCCESS:-D')
      router.push('/');
      // 作成した後にちゃんとページに反映されるかどうかを見る。
      router.refresh();

      close();
    } else {
      console.log('ERROR', response)
      console.log('ERROR', response.errors)
      console.log('Error.length', Object.keys(response.errors).length)

      const tmpErrors: string[] = Object.keys(response.errors).map((field: any) => {
        return `${field} is missing`;
      })
      console.log('tmpErrors', tmpErrors)
      setErrors(tmpErrors);
    }
  }

  const content = (
    <>
      {currentStep === 1 ? (
        <>
          <h2 className={styles.h2}>Choose category</h2>
          <Categories 
            dataCategory={formData.category}
            setCategory={setCategory}
          />
          <CustomButton 
            label='Next'
            onClick={() => setCurrentStep(2)}
          />
        </>
      ) : currentStep === 2 ? (
        <>
          <h2 className={styles.h2}>Describe your place</h2>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <label>Title</label>
              <input 
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData(d => { d.title = e.target.value })}
                className={styles.titleInput}
              />
            </div>

            <div className={styles.formHeader}>
              <label>Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={(e) => updateFormData(d => { d.description = e.target.value })}
                className={styles.descriptionInput}
              />
            </div>
          </div>

          <CustomButton 
            label='Previous'
            onClick={() => setCurrentStep(1)}
            className={styles.previousButton}
          />
          <CustomButton 
            label='Next'
            onClick={() => setCurrentStep(3)}
          />
        </>
      ) : currentStep === 3 ? (
        <>
          <h2 className={styles.h2}>Details</h2>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <label>Price per night</label>
              <input 
                type="number"
                value={formData.price}
                onChange={(e) => updateFormData(d => { d.price = e.target.value })}
                className={styles.titleInput}
              />
            </div>

            <div className={styles.formHeader}>
              <label>Bedrooms</label>
              <input 
                type="number"
                value={formData.bedrooms}
                onChange={(e) => updateFormData(d => { d.bedrooms = e.target.value })}
                className={styles.titleInput}
              />
            </div>

            <div className={styles.formHeader}>
              <label>Bathrooms</label>
              <input 
                type="number"
                value={formData.bathrooms}
                onChange={(e) => updateFormData(d => { d.bathrooms = e.target.value })}
                className={styles.titleInput}
              />
            </div>

            <div className={styles.formHeader}>
              <label>Max Guests</label>
              <input 
                type="number"
                value={formData.guests}
                onChange={(e) => updateFormData(d => { d.guests = e.target.value })}
                className={styles.titleInput}
              />
            </div>

          </div>
          
          <CustomButton 
            label='Previous'
            onClick={() => setCurrentStep(2)}
            className={styles.previousButton}
          />
          <CustomButton 
            label='Next'
            onClick={() => setCurrentStep(4)}
          />
        </>
      ) : currentStep === 4 ?(
        <>
          <h2 className={styles.h2}>Location</h2>
          <div className={styles.formContainer}>
            <SelectCountry 
              value={formData.country}
              onChange={(value: SelectCountryValue) => updateFormData(d => { d.country = value})}
            />
          </div>
          <CustomButton 
            label='Previous'
            onClick={() => setCurrentStep(3)}
            className={styles.previousButton}
          />
          <CustomButton 
            label='Next'
            onClick={() => setCurrentStep(5)}
          />
        </>
      ) : (
        <>
          <h2 className={styles.h2}>Image</h2>
          <div className={styles.formContainer}>
            <div className={styles.imageSection}>
              <input 
                type="file" 
                accept='image/*'
                onChange={setImage}
              />
            </div>

            {formData.image && (
              <div className={styles.imageContainer}>
                <Image 
                  fill
                  alt="Uploaded image"
                  src={URL.createObjectURL(formData.image)}
                  className={styles.image}
                />
              </div>
            )}

          </div>
          <div className={styles.errorContainer}>

            {errors && errors.map((error, index) => {
              return (
                <div
                key={index}
                className={styles.error2}
                >
                  {error}
                </div>
              )
            })}
          </div>

          <CustomButton 
            label='Previous'
            onClick={() => setCurrentStep(4)}
            className={styles.previousButton}
          />
          <CustomButton 
            label='Submit'
            type='submit'
            onClick={submitForm}
          />
        </>
      )}
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      label="Add property"
      content={content}
    />
  );
}
