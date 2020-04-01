import 'package:flutter/material.dart';
import 'gym_detail.dart';
import 'register.dart';
import 'splash.dart';
import 'login.dart';
import 'home.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Gym City',
        theme: ThemeData(
          primarySwatch: Colors.green,
        ),
        home: SplashPage(),
        routes: <String, WidgetBuilder>{
          '/gym': (BuildContext context) => GymDetail(title: 'Academia'),
          '/home': (BuildContext context) => HomePage(title: 'Home'),
          '/login': (BuildContext context) => LoginPage(),
          '/register': (BuildContext context) => RegisterPage(),
        });
  }
}
