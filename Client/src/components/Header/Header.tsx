import React from "react";
import cls from './Header.module.scss';


export const Header = () => {

  return (
    <div className={cls.Header}>
      <div className={cls.Header__logo}>POST</div>
      {/* <div className={cls.Header__search}> */}
        <input className={cls.Header__search} placeholder="Найти" />
      {/* </div> */}
      <div className={cls.Header__wrapper}>
        <div className={[cls.Header__item, cls.Header__itemUser].join(" ")}>{'user@mail.ru'}</div>
        <div className={[cls.Header__item, cls.Header__itemProfile].join(" ")}><i className="fas fa-user"/> </div>
        <div className={cls.Header__item}><i className="fas fa-sign-out-alt"/> </div>
      </div>
    </div>
  )
}


{/* <AppBar>
<Container fixed>
  <Toolbar>
    <IconButton edge="start" aria-label='menu' color='inherit' className={cls.menuButton}>
      <MenuIcon />
    </IconButton>
    <Typography variant='h5' className={cls.title}>Title</Typography>
    <Box >
      <Button color='inherit' variant='outlined'>Log In</Button>
      <Button color='secondary' variant="contained">Sign Up</Button>
    </Box>
  </Toolbar>
</Container>
</AppBar> */}