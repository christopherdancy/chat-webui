module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is working',
    env: {
      hasToken: !!process.env.VERCEL_TOKEN,
      hasTeamId: !!process.env.VERCEL_TEAM_ID,
      nodeEnv: process.env.NODE_ENV
    }
  });
}; 