import React from 'react';
import { ListGroup, Container } from 'react-bootstrap';

const Documentation = () => (
  <Container id="torder-docs-container">
    <Container id="introduction" className="torder-docs-section">
      <h2>Introduction</h2>
      <p>
        Donec vel tempus quam. Vivamus et orci facilisis, sollicitudin metus at,
        facilisis lectus. Nam leo lacus, consectetur sed maximus ut, pretium sit
        amet eros. Aenean ut arcu vitae nulla molestie placerat a id lacus. Duis
        venenatis, nisi nec porta placerat, massa dolor mattis nulla, vitae
        elementum turpis enim sit amet nulla. Nunc pulvinar ipsum eu mauris
        laoreet, venenatis mattis justo suscipit. Etiam lobortis, justo vitae
        consectetur tempor, diam libero hendrerit quam, vitae vestibulum lorem
        lorem id lacus. Sed a leo dictum, porttitor sapien ut, lacinia lacus.
        Integer dapibus diam arcu, malesuada auctor nulla efficitur non.
        Phasellus cursus augue quam, pretium tincidunt turpis vulputate et.
        Pellentesque eu magna eleifend, pretium ligula id, efficitur dolor. Ut
        congue, quam hendrerit molestie facilisis, nisl lacus elementum lacus,
        et faucibus tortor lorem vulputate justo. Quisque vel lacus lobortis,
        ultricies risus ut, mollis nibh. Etiam elementum urna eu sapien
        pellentesque porttitor.
      </p>
    </Container>
    <Container id="getting-started" className="torder-docs-section">
      <h2>Getting Started</h2>
      <p>
        Duis molestie luctus sapien, ut sollicitudin massa rhoncus sed. Donec
        vitae faucibus sem. Duis vestibulum nisi eget dapibus interdum. Sed
        vitae neque eu orci consequat interdum. Aliquam eleifend sapien non nisl
        finibus, quis porta nulla rutrum. Donec pulvinar maximus nibh vitae
        rhoncus. Integer vel lectus pulvinar, faucibus leo et, fermentum mi.
        Aenean bibendum orci sed turpis euismod fermentum. Interdum et malesuada
        fames ac ante ipsum primis in faucibus. Nulla consequat quis arcu eu
        eleifend. Nullam tristique eros at varius gravida. Vestibulum in
        volutpat nisi, in rutrum arcu. Sed quis tortor vulputate, tempus neque
        sed, blandit elit. Quisque ultricies hendrerit odio eu facilisis. Mauris
        nec metus elementum, mollis dolor at, porta ligula. Morbi pretium
        consectetur turpis. Phasellus consequat, purus nec fermentum finibus,
        mauris magna convallis turpis, non facilisis sapien arcu vel quam.
        Pellentesque laoreet sem ac libero tincidunt, non congue tortor
        placerat. Sed mollis nisi lacus, eget auctor sem rhoncus eget.
        Pellentesque a sapien id turpis cursus rhoncus. Nullam laoreet lorem
        lorem, porta lacinia neque malesuada a.
      </p>
    </Container>
    <Container id="glossary" className="torder-docs-section">
      <h2>Glossary</h2>
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item>Sed mattis quam eget bibendum pulvinar.</ListGroup.Item>
        <ListGroup.Item>
          Cras vulputate arcu ut facilisis efficitur.
        </ListGroup.Item>
        <ListGroup.Item>
          Aliquam elementum felis at interdum mattis.
        </ListGroup.Item>
        <ListGroup.Item>
          Ut ac sapien nec lacus ultrices finibus.
        </ListGroup.Item>
        <ListGroup.Item>
          Integer sed velit vestibulum risus egestas egestas in quis lacus.
        </ListGroup.Item>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item>Sed mattis quam eget bibendum pulvinar.</ListGroup.Item>
        <ListGroup.Item>
          Cras vulputate arcu ut facilisis efficitur.
        </ListGroup.Item>
        <ListGroup.Item>
          Aliquam elementum felis at interdum mattis.
        </ListGroup.Item>
        <ListGroup.Item>
          Ut ac sapien nec lacus ultrices finibus.
        </ListGroup.Item>
        <ListGroup.Item>
          Integer sed velit vestibulum risus egestas egestas in quis lacus.
        </ListGroup.Item>
      </ListGroup>
    </Container>
    <Container id="references" className="torder-docs-section">
      <h2>References</h2>
      <p>
        Praesent sollicitudin nulla risus, non aliquet est congue eget. Nulla
        sit amet tristique diam, eu egestas nisi. Duis diam nibh, lacinia nec
        dignissim a, luctus ut mauris. Aenean pretium, enim sed posuere
        bibendum, turpis ex dignissim risus, vel dapibus lacus purus sed lorem.
        Sed lectus magna, egestas ac ipsum ut, congue luctus libero. Ut urna
        purus, facilisis sit amet malesuada a, fermentum et erat. Etiam felis
        orci, pulvinar at diam sit amet, bibendum mattis est. Ut et ullamcorper
        nisl, id.
      </p>
    </Container>
    <Container id="citing" className="torder-docs-section">
      <h2>Citing</h2>
      <p>
        Suspendisse faucibus, est quis sollicitudin ornare, dui massa finibus
        ante, sit amet sodales magna lectus et nulla. Duis quam velit.
      </p>
    </Container>
  </Container>
);

export default Documentation;
