const KEYS = {
  applicants: 'applicants',
  applicantId: 'applicantId',
}

export const getPatentLanguage = () => [
  { id: '1', title: 'English' },
  { id: '2', title: 'French' },
  { id: '3', title: 'German' },
  { id: '4', title: 'Spanish' },
]

export const insertApplicant = (data) => {
  let applicants = getAllApplicants()
  data['id'] = generateApplicantId()
  applicants.push(data)
  localStorage.setItem(KEYS.applicants, JSON.stringify(applicants))
}

export const generateApplicantId = () => {
  if (localStorage.getItem(KEYS.applicantId) == null)
    localStorage.setItem(KEYS.applicantId, '0')
  var id = parseInt(localStorage.getItem(KEYS.applicantId))
  localStorage.setItem(KEYS.applicantId, (++id).toString())
  return id
}

export const getAllApplicants = () => {
  if (localStorage.getItem(KEYS.applicants) == null)
    localStorage.setItem(KEYS.applicants, JSON.stringify([]))
  return JSON.parse(localStorage.getItem(KEYS.applicants))
}
