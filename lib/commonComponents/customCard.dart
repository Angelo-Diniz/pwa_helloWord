import 'package:flutter/material.dart';
import '../gym_detail.dart';

class CustomCard extends StatelessWidget {
  CustomCard({@required this.title, this.description});

  final title;
  final description;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Container(
        padding: const EdgeInsets.only(top: 5.0),
        child: Column(
          children: <Widget>[
            Text(title),
            FlatButton(
              child: Text("Clique e veja mais"),
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) =>
                            GymDetail(title: title, description: description)));
              },
            ),
          ],
        ),
      ),
    );
  }
}
