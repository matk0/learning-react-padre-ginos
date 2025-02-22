import { createFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import postContact from '../api/postContact';

export const Route = createFileRoute('/contact')({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        formData.get('name'),
        formData.get('email'),
        formData.get('message'),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      {mutation.isSuccess ? (
        <p>Submitted</p>
      ) : (
        <form onSubmit={mutation.mutate}>
          <label>
            <input type="text" name="name" placeholder="Name" />
          </label>
          <label>
            <input type="email" name="email" placeholder="Email" />
          </label>
          <label>
            <textarea name="message" placeholder="Message" />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {mutation.isLoading && <p>Submitting …</p>}
      {mutation.isError && <p>Failed to submit</p>}
    </div>
  );
}
