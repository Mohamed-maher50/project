export const userAlreadyFollowing = (user, currentUser) =>
  user?.following.includes(currentUser._id);
