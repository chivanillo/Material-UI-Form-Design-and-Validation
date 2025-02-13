import React from 'react'
import { Grid } from '@material-ui/core'
import Controls from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm'
import * as applicantService from '../../services/applicantService'

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
]

const initialFValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
}

export default function ApplicantForm() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? '' : 'This field is required.'
    if ('email' in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Email is not valid.'
    if ('mobile' in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required.'
    if ('departmentId' in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? '' : 'This field is required.'
    setErrors({
      ...temp,
    })

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '')
  }

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      applicantService.insertApplicant(values)
      resetForm()
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="languageId"
            label="Language"
            value={values.languageId || '1'}
            onChange={handleInputChange}
            options={applicantService.getPatentLanguage()}
            error={errors.languageId}
          />
          <Controls.DatePicker
            name="applicantDate"
            label="Date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          {/* <Controls.Checkbox
            name="isPermanent"
            label="Permanent Applicant"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}
