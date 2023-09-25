import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../assets/css/dashboardcards.css'
import { useNavigate } from 'react-router-dom';


function JobCreateCard() {
  const navigate = useNavigate()
  function submit() {
    navigate('/dashboard/jobcreation')
  }
  return (
    <Card>
      <Card.Header className='card-header'>Create a Job!!</Card.Header>
      <Card.Body>
        <Card.Title className='card-title'>Hire The LEGENDS!!!</Card.Title>
        <Card.Text className='card-text'>
          <strong>Responsibilities:</strong>
          <ul>
            <li>Collaborate with cross-functional teams to drive project success.</li>
            <li>Analyze and implement innovative solutions to complex problems.</li>
            <li>Continuously learn and stay updated on industry best practices.</li>
          </ul>

          <strong>Qualifications:</strong>
          <ul>
            <li>Bachelor's degree in a related field.</li>
            <li>Strong communication and teamwork skills.</li>
            <li>Proven track record of achieving results.</li>
          </ul>

          Join us on our journey to success and be part of a team that strives for excellence!
        </Card.Text>
        <Button onClick={submit} variant="primary">HIRE!</Button>
      </Card.Body>
    </Card>
  );
}

export default JobCreateCard;
