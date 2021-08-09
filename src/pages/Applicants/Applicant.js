import React from 'react'
import ApplicantForm from './ApplicantForm'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import { Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}))

export default function Applicant() {
  const classes = useStyles()

  return (
    <>
      <PageHeader
        title="New Patent"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <ApplicantForm />
      </Paper>
    </>
  )
}
