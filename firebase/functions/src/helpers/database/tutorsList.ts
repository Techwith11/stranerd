import * as admin  from 'firebase-admin'

type TutorListInfo = {
	email: string,
	courses: string[],
	tutor: boolean
}

export  const fetchTutorsList = async () => {
	try{
		const docs = await admin.database().ref(`tutors`).once('value')
		const tutorsObj = Object.entries(docs.val() as { [key: string]: TutorListInfo })
		const tutors = tutorsObj.map((t) => ({ ...t[1], id: t[0] }))
		return tutors.filter((t) => t.tutor)
	}
	catch(e){
		console.error(e.message)
		return []
	}
}

export  const addToTutorsList = async (id: string, data: Partial<TutorListInfo>) => {
	try{
		await admin.database().ref(`tutors/${id}`).set({
			email: data.email,
			courses: data.courses,
			tutor: true
		})
	}
	catch(e){ console.error(e.message) }
}

export  const removeFromTutorsList = async (id: string) => {
	try{
		await admin.database().ref(`tutors/${id}/tutor`).set(false)
	}catch(e){ console.error(e.message) }
}
